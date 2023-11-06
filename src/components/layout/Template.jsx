import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from 'reactstrap'
const Template = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <>
            <Navbar color="dark" light={false} dark={true} full={'true'} expand={true} container={'fluid'}>
                <NavbarBrand href="/">Modelos App</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Clientes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                GitHub
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>Unidad II</NavbarText>
                </Collapse>
            </Navbar>

            <main className="container">
                <div className="bg-body-tertiary p-3 rounded mt-4">
                    {children}
                </div>
            </main>
        </>
    )
}

export default Template