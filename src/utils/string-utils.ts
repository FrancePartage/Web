import { v4 as uuidv4 } from 'uuid';

export const randomUid = (): string => {
    return uuidv4();
}

export const isValidMail = (email: string) => {
	return new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(email);
}

export const getRelationString = (relationType: string): string => {
    switch (relationType) {
        case 'FAMILY':          return 'Famille';
        case 'FRIEND':          return 'Ami';
        case 'WORKMATE':        return 'Collègue';
        case 'SPOUSE':          return 'Conjoint';
        default:                return 'Ami';
    }
}