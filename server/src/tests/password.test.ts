import { validatePassword } from "../utils/password";

describe("Password Validator - White Box Testing", () => {
  // --- Tests de base (Branches 1, 2, 3) ---
  it("devrait rejeter un mot de passe vide", () => {
    expect(validatePassword("", 25)).toBe(false);
  });

  it("devrait rejeter un mot de passe trop court (< 8)", () => {
    expect(validatePassword("Ab1!", 25)).toBe(false);
  });

  it("devrait rejeter un mot de passe trop long (> 20)", () => {
    expect(validatePassword("StrongPass123!MoreThan20Chars", 25)).toBe(false);
  });

  // --- Cas ENFANT (< 12 ans) ---
  it("Enfant : devrait rejeter sans minuscule", () => {
    expect(validatePassword("12345678", 10)).toBe(false);
  });

  it("Enfant : devrait accepter avec juste des minuscules", () => {
    expect(validatePassword("password", 10)).toBe(true);
  });

  // --- Cas ADULTE (12 <= age < 65) ---
  // Ici on teste la Branch 5 qui a des "OU" (||)
  it("Adulte : devrait rejeter sans majuscule", () => {
    expect(validatePassword("lowercase1!", 25)).toBe(false);
  });

  it("Adulte : devrait rejeter sans minuscule", () => {
    expect(validatePassword("UPPERCASE1!", 25)).toBe(false);
  });

  it("Adulte : devrait rejeter sans chiffre", () => {
    expect(validatePassword("OnlyLetters!", 25)).toBe(false);
  });

  it("Adulte : devrait rejeter sans caractère spécial (Branch 6)", () => {
    expect(validatePassword("NoSpecial123", 25)).toBe(false);
  });

  it("Adulte : devrait accepter un mot de passe parfait", () => {
    expect(validatePassword("Valid123!", 25)).toBe(true);
  });

  // --- Cas SENIOR (>= 65 ans) (Branch 7) ---
  it("Senior : devrait rejeter si ni chiffre NI majuscule", () => {
    // Que des minuscules = échec de (hasNumbers && hasUpperCase)
    expect(validatePassword("uniquementmini", 70)).toBe(false);
  });

  it("Senior : devrait accepter avec juste une majuscule", () => {
    expect(validatePassword("Seulementmaj", 70)).toBe(true);
  });

  it("Senior : devrait accepter avec juste un chiffre", () => {
    expect(validatePassword("chiffre123", 70)).toBe(true);
  });
});