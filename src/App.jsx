import { useState } from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Template from "./components/layout/Template"
import Home from "./components/Home"
import Clientes from "./components/Clientes"

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'

function App() {

  return (
    <>
        <BrowserRouter>
            <Template>
                <Routes>
                    <Route path="/" element={<Clientes />} />
                    <Route path="/clientes" element={<Clientes />} />
                </Routes>
            </Template>
        </BrowserRouter>

    </>
  )
}

export default App
