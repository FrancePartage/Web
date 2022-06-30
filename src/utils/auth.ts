import { NextPageContext } from "next";
import Router from 'next/router';
import { me, refreshTokens } from '@/packages/api/auth';
import { UserRole } from "@/enums/roles";
import { checkCookies, getCookies, removeCookies, setCookies } from "cookies-next";

const redirectOnError = (ctx: NextPageContext) => { 
	deleteTokens(ctx);

	if (typeof window !== "undefined") {
		Router.push("/")
	} else {
		ctx.res!.writeHead(302, { Location: "/" }).end();
	}  

	return { user: null };
}

export const isAuthenticated = async (ctx: NextPageContext) => {
	try {
		const tokens: Tokens = getTokens(ctx);

		if (!hasCookie('accessToken', ctx)) {
			if (!hasCookie('refreshToken', ctx)) {
				return await redirectOnError(ctx);
			}

			const newTokens = await refreshTokens(tokens.refreshToken);

			if (!newTokens) {
				return await redirectOnError(ctx);
			}
			
			tokens.accessToken = newTokens.accessToken;
			tokens.refreshToken = newTokens.refreshToken;
			
			setCookie('accessToken', tokens.accessToken, 15 * 60, ctx);
			setCookie('refreshToken', tokens.refreshToken, 60 * 60 * 24 * 15, ctx);
		}

		const user = await getUser(tokens.accessToken);

		if (!user) {
			return await redirectOnError(ctx);
		} 

		return { user };
	} catch (error) {
		return await redirectOnError(ctx);
	}
}

export const isMaybeAuthentificated = async (ctx: NextPageContext) => {
	try {
		const tokens: Tokens = getTokens(ctx);

		if (!hasCookie('accessToken', ctx)) {
			if (!hasCookie('refreshToken', ctx)) {
				return { user: null };
			}

			const newTokens = await refreshTokens(tokens.refreshToken);

			if (!newTokens) {
				return { user: null };
			}
			
			tokens.accessToken = newTokens.accessToken;
			tokens.refreshToken = newTokens.refreshToken;
			
			setCookie('accessToken', tokens.accessToken, 15 * 60, ctx);
			setCookie('refreshToken', tokens.refreshToken, 60 * 60 * 24 * 15, ctx);
		}

		const user = await getUser(tokens.accessToken);

		if (!user) {
			return { user: null };
		} 

		return { user };
	} catch (error) {
		return { user: null };
	}
}

export const isAuthenticatedWithRole = async (ctx: NextPageContext, roles: UserRole[]) => {
	const { user } = await isAuthenticated(ctx);

	if (!user) {
		return await redirectOnError(ctx);
	}
	
	if (!roles.includes(user.role)) {
		return await redirectOnError(ctx);
	}

	return { user };
}

export const isNotAuthenticated = async (ctx: NextPageContext) => {  
	if (hasCookie('accessToken', ctx) || hasCookie('refreshToken', ctx)) {
		return await redirectOnError(ctx);
	}

	return {};
}

const getUser = async (accessToken: string) => {
	try {
		const response = await me(accessToken);

		if (!response || response.status !== 200) {
			return null;
		}

		const user = await response.json();
		return user;
	} catch (error) {
		return null;
	}
}

const getTokens = (ctx: NextPageContext): Tokens => {
	const { req, res } = ctx;

	const isServer = !!ctx.req;

	let cookies;

	if (isServer) {
		cookies = getCookies({ req, res });
	} else {
		cookies = getCookies();
	}

	return {
		accessToken: cookies.accessToken,
		refreshToken: cookies.refreshToken
	};
}

export const deleteTokens = (ctx: NextPageContext) => {
	const { req, res } = ctx;

	const isServer = !!ctx.req;

	if (isServer) {
		removeCookies('accessToken', { req, res });
		removeCookies('refreshToken', { req, res });
	} else {
		removeCookies('accessToken');
		removeCookies('refreshToken');
	}
}

const setCookie = (cookie: string, value: string, age: number, ctx: NextPageContext) => {
	const { req, res } = ctx;

	const isServer = !!ctx.req;

	if (isServer) {
		setCookies(cookie, value, { req, res, maxAge: age });
	} else {
		setCookies(cookie, value, { maxAge: age });
	}
}

const hasCookie = (cookie: string, ctx: NextPageContext): boolean => {
	const { req, res } = ctx;

	const isServer = !!ctx.req;

	if (isServer) {
		return checkCookies(cookie, { req, res });
	} else {
		return checkCookies(cookie);
	}
}

type Tokens = {
	accessToken: string;
	refreshToken: string;
}