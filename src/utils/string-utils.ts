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

export const resourceStatus = (resourceStatus: string) => {
    let label = "En attente de validation"
    switch (resourceStatus) {
        case 'APPROVED' :
            label = "Approuvée"
            break;
        case 'SUSPENDED':
            label = "Suspendue"
            break;
        default:
            break;
    }
    return label;
}

export const userRole = (userRole: string) => {
    let label = "Citoyen";
    switch (userRole) {
        case 'MDOERATOR' :
            label = "Modérateur"
            break;
        case 'ADMIN':
            label = "Administrateur"
            break;
        case 'SUPER_ADMIN':
            label = "Super-Administrateur"
            break;
        default:
            break;
    }
    return label;
}
