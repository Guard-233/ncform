/// <reference types="Cypress" />

import common from './common';

context('Table', () => {
  before(() => {
    cy.visit('http://localhost:3004/examples/components/playground/index.html');
  });

  it('Simple Props', () => {
    let formSchema = {
      type: 'object',
      properties: {
        users1: {
          type: 'array',
          items: {
            type: 'string'
          },
          ui: {
            widget: 'array-table',
            widgetConfig: {
              collapsed: true,
              addTxt: 'Add Item',
              delAllTxt: 'Remove All'
            }
          }
        },
        users2: {
          type: 'array',
          value: [
            'daniel', 'sarah'
          ],
          items: {
            type: 'string'
          },
          ui: {
            widget: 'array-table',
            widgetConfig: {
              disableAdd: true,
              disableDel: true,
              disableReorder: true,
              disableCollapse: true,
            }
          }
        }
      }
    };
    cy.window()
      .its('editor')
      .invoke('setValue', JSON.stringify(formSchema, null, 2));
    common.startRun();

    cy.get('.previewArea').within(() => {
      // Declare action elements
      cy.get('legend')
      .contains('users1')
      .parent()
      .within(() => {
        cy.get('legend').next().should('not.be.visible');
        cy.get('legend').click();
        cy.get('legend').next().should('be.visible');

        cy.get('button').contains('Add Item').click();
        cy.get('input').its('length').should('equal', 2);

        cy.get('input').eq(0).type('daniel')
        cy.get('input').eq(1).type('sarah')
        cy.get('.el-icon-sort-down:visible').click();
        cy.get('input').eq(0).should('have.value', 'sarah')
        cy.get('input').eq(1).should('have.value', 'daniel')

        cy.get('.el-icon-remove').eq(0).click();
        cy.get('input').its('length').should('equal', 1);
      });

      cy.get('legend')
      .contains('users2')
      .parent()
      .within(() => {
        cy.get('legend').next().should('be.visible');
        cy.get('legend').click();
        cy.get('legend').next().should('be.visible');

        cy.get('.el-icon-sort-up').should('not.exist');
        cy.get('.el-icon-sort-down').should('not.exist');

        cy.get('button:contains("Add")').should('not.exist');

        cy.get('button:contains("Delete All")').should('not.exist');
        cy.get('.el-icon-remove').should('not.exist');
      });
      // common.submitForm();
    });
  });
});
