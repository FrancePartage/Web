export const getRelationObject = (currentUserId: number, relation: any): any => {
  const participant = relation.participants.filter((x: any) => parseInt(x.id) !== parseInt(currentUserId.toString()))[0];

  return {
    type: relation.type,
    participant: participant,
  };
} 