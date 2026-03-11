export type UserRole = "admin" | "user" | "stagiaire";

export const validateUserRegistration = (
  age: number,
  role: string,
  email: string
): boolean => {
  // 1. Validation du rôle
  const validRoles = ["admin", "user", "stagiaire"];
  if (!validRoles.includes(role)) {
    throw new Error("Rôle invalide");
  }

  // 2. Validation de l'âge
  if (isNaN(age) || age < 0 || age > 120) {
    throw new Error("Âge invalide");
  }

  if (age < 18 && role !== "stagiaire") {
    return false;
  }

  // 3. Validation Email
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  return true;
};