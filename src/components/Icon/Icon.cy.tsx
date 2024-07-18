import Icon from './index'

it('it should render the correct text for icon inside a tag <span></span>', () => {
    cy.mount(<Icon icon="add" type="presentational" />)
    cy.get('span').should('contain.text', 'add')
})

it('it should render the correct text for icon inside a tag <button />', () => {
    cy.mount(<Icon icon="chevron_left" type="button" onClick={() => {}} />)
    cy.get('button').should('contain.text', 'chevron_left')
})

it('it should render the correct text for icon inside a tag <a></a>', () => {
    cy.mount(<Icon icon="close" type="link" href="/" />)
    cy.get('a').should('contain.text', 'close')
})
