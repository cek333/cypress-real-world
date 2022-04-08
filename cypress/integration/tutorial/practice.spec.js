/* eslint-disable mocha/no-mocha-arrows */
const BASE_URL = 'http://localhost:8888';

describe('React TodoMVC practice', () => {

  const TODOS = [ 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE' ];

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it('adds five todos', () => {
    // Without using the cy.createDefaultTodos() custom command
    // write a test that asserts you can add 5 todos
    // Hint: make sure to assert the length is equal to 5
    cy.get('.new-todo')
      .type(`${TODOS[0]}{enter}`)
      .type(`${TODOS[1]}{enter}`)
      .type(`${TODOS[2]}{enter}`)
      .type(`${TODOS[3]}{enter}`)
      .type(`${TODOS[4]}{enter}`);
    cy.get('.todo-list li').should('have.length', 5);
    cy.get('.todo-count').contains('5 items left');
  });

  it('focuses on the todo input field, when the app is first opened', () => {
    // Write a test that asserts that the input field
    // is focused automatically when the app is first loaded.
    // Hint: you will need to use cy.focused()
    // https://docs.cypress.io/api/commands/focused
    cy.focused().should('have.attr', 'class').and('eq', 'new-todo');
  });

  it('should clear text input field when an item is added', () => {
    // Write a test that ensures that the input field is cleared
    // after adding a todo
    cy.get('.new-todo').type(`${TODOS[0]}{enter}`);
    cy.get('.todo-count').contains('1 item left');
    cy.get('.new-todo').invoke('val').should('eq', '');
  });

  it('can mark a todo as "completed"', () => {
    // Write a test that ensures that a todo can be "completed"
    // Hint: You will need to verify the class name of the completed todo
    cy.createDefaultTodos();
    cy.get('.todo-list li').eq(0).find('input[type="checkbox"]').click();
    cy.get('.todo-list li').eq(0).should('have.class', 'completed');
  });

  it('the "Clear completed" button clears all completed todos', () => {
    // Write a test that ensures that the "Clear completed" removes
    // all completed todos from the app
    // Hint: You will need to verify the class name of the completed todo
    cy.createDefaultTodos();
    // Mark two todos as completed
    cy.get('.todo-list li').eq(0).find('input[type="checkbox"]').click();
    cy.get('.todo-list li').eq(1).find('input[type="checkbox"]').click();
    // Clear Todos
    cy.get('footer button.clear-completed').click();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li').eq(0).should('not.have.class', 'completed');
  });

  it('allows you to edit a todo', () => {
    // Write a test that ensures that you can edit a todo
    // Hint: You will need to use cy.dblclick()
    // https://docs.cypress.io/api/commands/dblclick
    cy.createDefaultTodos();
    cy.get('.todo-list li').eq(0).dblclick().clear().type(`${TODOS[3]}{enter}`);
    cy.get('.todo-list li').eq(0).find('label').should('contain', TODOS[3]);
  });

  it('should save edits on blur', () => {
    // Write a test that ensures that an edited todo is saved when it is blurred
    // Hint: You will need to use cy.blur()
    // https://docs.cypress.io/api/commands/blur
    cy.createDefaultTodos();
    cy.get('.todo-list li').eq(0).dblclick().clear().type(TODOS[3]);
    cy.focused().blur();
    cy.get('.todo-list li').eq(0).find('label').should('contain', TODOS[3]);
  });

  it('should display the current number of todo items', () => {
    // Write a test that ensures that the app counts the correct number of todos
    // left to be completed, i.e "3 items left" in the bottom left corner.
    cy.createDefaultTodos();
    cy.get('.todo-count').contains('3 items left');
    // Remove an item and re-check the count
    cy.get('.todo-list li').eq(0).find('input[type="checkbox"]').click();
    cy.get('footer button.clear-completed').click();
    cy.get('.todo-count').contains('2 items left');
  });

  it('should persist its data after a page refresh', () => {
    // Write a test that ensures that the todos are persisted in the app
    // after the browser refreshes the page
    // Hint: You will need to use cy.reload()
    // https://docs.cypress.io/api/commands/reload
    cy.createDefaultTodos();
    cy.get('.todo-count').contains('3 items left');
    cy.reload();
    cy.get('.todo-count').contains('3 items left');
  });

  it('can display only completed todos', () => {
    // Write a test that ensures that only the completed todos are
    // displayed when the "Completed" button is clicked at the bottom
    cy.createDefaultTodos();
    // Mark two items as completed
    cy.get('.todo-list li').eq(0).find('input[type="checkbox"]').click();
    cy.get('.todo-list li').eq(1).find('input[type="checkbox"]').click();
    // Use completed filter
    cy.get('.filters li').contains('Completed').click();
    cy.get('.todo-list li').should('have.length', 2).then(listItems => {
      Array.from(listItems).forEach(li => {
        expect(li).to.have.class('completed');
      });
    });
  });
});
