// Fonction à tester (normalement importée depuis votre code)
const add = (a: number, b: number) => a + b;

describe('Math Utils', () => {
  it('devrait additionner deux nombres correctement', () => {
    // Arrange (les valeurs sont 2 et 3)
    // Act
    const result = add(2, 3);
    // Assert
    expect(result).toBe(5);
  });

  it('devrait gérer les nombres négatifs', () => {
    expect(add(-1, -1)).toBe(-2);
  });
});