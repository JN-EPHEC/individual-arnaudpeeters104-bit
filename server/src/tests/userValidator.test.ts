import { validateUserRegistration } from "../utils/userValidator";

describe("User Registration Validator - Final Project", () => {
  
  test.each([
    [25, "user", "test@ephec.be", true, "Adulte valide"],
    [16, "stagiaire", "test@ephec.be", true, "Mineur stagiaire"],
    [17, "user", "test@ephec.be", false, "Mineur non stagiaire"],
    [20, "admin", "invalid-email", false, "Email sans point ou @"],
  ])('Cas %s : %s', (age, role, email, expected) => {
    expect(validateUserRegistration(age as number, role, email)).toBe(expected);
  });

  it("devrait lever une erreur pour un rôle inexistant", () => {
    expect(() => validateUserRegistration(20, "guest", "a@b.c")).toThrow("Rôle invalide");
  });

  it("devrait lever une erreur pour un âge hors limites", () => {
    expect(() => validateUserRegistration(150, "user", "a@b.c")).toThrow("Âge invalide");
    expect(() => validateUserRegistration(-5, "user", "a@b.c")).toThrow("Âge invalide");
  });
});