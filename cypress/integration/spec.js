/// <reference types="cypress" />
describe('cypress api intercept bug', () => {
  it('ListInsightViewMetricsByInsightViewId api', () => {

    let i = 0;
	 cy.intercept(
		{
			method: `POST`,
			url: `sentinemail`
		},
		req => {
			if (req.body.query.includes(`ListInsightViewMetricsByInsightViewId`)) {
				i += 1;
        console.log(i);
			//	req.reply({fixture: `${path}/${query}-${i}.json`}); This is where we stub responses for the query being called multiple times. It is failing currently as cypress is very inconsistent while intercepting api that is being called multiple times.
			}
		}
	);
    cy.visit('https://develop.convosight.com/app/cs-admin-login');
    cy
		.get(`[type="submit"]`,{timeout:30000})
		.as(`BtnSubmit`)
		.should(`be.disabled`)
		.get(`[data-placeholder="Email"]`,{timeout:30000})
		.type(`sentinemail`)
		.get(`[data-placeholder="Password"]`)
		.type(`sentinemail`)
		.get(`@BtnSubmit`)
		.should(`be.enabled`)
		.click()
    .get(`.brand-list-wrapper > :nth-child(1)`,{timeout:60000})
    .click()
    .get(`.link-btn`)
    .click()

  })
})  
