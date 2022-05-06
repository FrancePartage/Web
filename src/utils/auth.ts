import { NextPageContext } from "next";
import nextCookie from 'next-cookies';
import { Router } from 'next/router';
import Cookies from 'cookies';
import { me, refreshTokens } from '@/packages/api/auth';
import { UserRole } from "@/enums/roles";

const redirectOnError = (ctx: NextPageContext) => typeof window !== "undefined" ? Router.push("/") : ctx.res.writeHead(302, { Location: "/" }).end();

export const isAuthenticated = async (ctx: NextPageContext) => {
	const cookies = new Cookies(ctx.req, ctx.res);
	let { accessToken, refreshToken } = nextCookie(ctx);

	try {
		if (!accessToken) {

			if (!refreshToken) {
				return await redirectOnError(ctx);
			}

			const tokens = await refreshTokens(refreshToken);

			if (!tokens) {
				return await redirectOnError(ctx);
			}
			
			accessToken = tokens.accessToken;
			refreshToken = tokens.refreshToken;
			
			cookies.set('accessToken', accessToken, { maxAge: 15 * 60 * 1000 });
			cookies.set('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 15 * 1000 });
		}

    const response = await me(accessToken!);

		if (!response) {
			return await redirectOnError(ctx);
		}

		if (response.status !== 200) {
			return await redirectOnError(ctx);
		}

		const user = await response.json();

		return { user };
	} catch (error) {
		return await redirectOnError(ctx);
	}
}

export const isMaybeAuthentificated = async (ctx: NextPageContext) => {
	const cookies = new Cookies(ctx.req, ctx.res);
	let { accessToken, refreshToken } = nextCookie(ctx);

	if (!accessToken && !refreshToken) {
		return { user: null };
	}

		try {
		if (!accessToken) {
			const tokens = await refreshTokens(refreshToken!);

			if (!tokens) {
				return { user: null };
			}
			
			accessToken = tokens.accessToken;
			refreshToken = tokens.refreshToken;
			
			cookies.set('accessToken', accessToken, { maxAge: 15 * 60 * 1000 });
			cookies.set('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 15 * 1000 });
		}

    const response = await me(accessToken!);

		if (!response) {
			return { user: null };
		}

		if (response.status !== 200) {
			return { user: null };
		}

		const user = await response.json();

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
	let { accessToken, refreshToken } = nextCookie(ctx);
  
	if (accessToken || refreshToken) {
		return await redirectOnError(ctx);
	}

	return {};
}