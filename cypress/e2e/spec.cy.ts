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

    cy.get('.todos li').should('have.length', tasks.length);
    tasks.forEach((task, index) => {
      cy.get('.todos li p').eq(index).should('have.text', `- ${task}`);
    });

    cy.get('.delete-icon').eq(4).click();
    cy.get('.delete-icon').eq(3).click();

    cy.get('.todos li').should('have.length', tasks.length - 2);
  });

  it('Deve manter as tarefas no localStorage após recarregar a página', () => {
    cy.visit('/');
    cy.get('.todo-input').type('Minha nova tarefa');
    cy.get('.todo-button').click();
    cy.reload();

    cy.window().then((window) => {
      const todos = window.localStorage.getItem('todos');
      expect(todos).to.exist;
      expect(todos).to.contain('Minha nova tarefa');
    });

    cy.get('.todos li').should('have.length', 1);
    cy.get('.todos li p').should('have.text', '- Minha nova tarefa');
  });
});
