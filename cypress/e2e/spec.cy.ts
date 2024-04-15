describe('Todo list', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verifica se a aplicação foi carregada corretamente', () => {
    cy.get('.title').should('have.text', 'Todo list');
    cy.get('.todo-input').should('have.attr', 'placeholder', 'Ex: Comprar pão...');
    cy.get('.todo-button').should('have.text', 'Add');
    cy.get('.feedback').should('have.text', 'No todos');
  });

  it('Adiciona e remove tarefas', () => {
    const tasks = [
      'Terminar a E-commerce',
      'Estudar Cypress',
      'Começar o projeto App Receitas 2.0',
      'Arrumar um emprego',
      'Ficar rico e fugir para uma ilha deserta',
    ];
    
    // Adiciona tarefas
    cy.get('.todo-input').type(' ');
    const todoButton = cy.get('.todo-button');
    todoButton.click();
    todoButton.click();

    tasks.forEach(task => {
      const todoInput = cy.get('.todo-input');

      todoInput.type(task);
      todoButton.click();
      todoInput.should('have.value', '');
    });

    // Verifica se as tarefas foram adicionadas corretamente
    cy.get('.todos li').should('have.length', tasks.length);
    tasks.forEach((task, index) => {
      cy.get('.todos li p').eq(index).should('have.text', task);
    });

    // Remove tarefas
    cy.get('.delete-icon').eq(4).click();
    cy.get('.delete-icon').eq(3).click();

    // Verifica se as tarefas foram removidas corretamente
    cy.get('.todos li').should('have.length', tasks.length - 2);
  });
});
