import { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, FormGroup, Label, Input, Row, Table } from 'reactstrap'

// librería principal para realizar requests a servidor
import axios from 'axios'

const Clientes = () => {
    // arreglo de clientes
    const [clientes, setClientes ] = useState([])
    // estado de switcher
    const [clienteHabilitado, setClienteHabilitado] = useState(true)
    // estados de nombre y dirección
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    // estados para saber si la página se encuentra en carga
    const [cargando, setCargando] = useState(false)
    // mensaje de estado
    const [mensaje, setMensaje] = useState('')
    // estado de mostrar mensaje
    const [mensajeVisible, setMensajeVisible] = useState(false)


    // ejecuta cuando se termina de cargar la página de clientes
    useEffect(() => {
        // función para obtener datos desde backend (get request)
        const loadClients = async() => {
            await axios.get('http://localhost:8000/api/clientes')
                .then(response => {
                    // en caso de respuesta 2xx, establecer el
                    // contenido del estado "clientes" con
                    // lo obtenido desde el backend
                    setClientes(response.data.clientes)
                })
                // en caso de error, indicar
                .catch(() => alert('Ha ocurrido un error al obtener los clientes'))
        }

        // llamada a función para obtener datos desde backend
        // cuando termina de carga la página
        loadClients()
    }, [])

    // Limpiar los campos
    const cleanFields = () => {
        setNombre('')
        setDireccion('')
        setClienteHabilitado(true)
    }

    // Realizar solicitud de registro nuevo cliente
    const handleSaveClient = async(e) => {
        setCargando(true)
        e.preventDefault()

        if(checkIfEmpty(nombre) || checkIfEmpty(direccion)) {
            alert('Debe ingresar datos de cliente')
            setCargando(false)
            return
        }

        let postData = {
            nombre,
            direccion,
            habilitado: clienteHabilitado
        }
        console.log(postData)
        let result = await axios.post('http://localhost:8000/api/clientes', postData)
            .then((response) => {
                // en caso de respuesta 2xx, entregar aviso
                setMensajeVisible(true)
                setCargando(false)
                cleanFields()
            })
            // en caso de error, indicar
            .catch(() => {
                alert(`Ha ocurrido un error al ingresar el cliente '${nombre}'`)
                setCargando(false)
            })

    }

    // Función para verificar si un texto está vacío
    const checkIfEmpty = ( text ) => {

        if (typeof text === "string" && text.length === 0) {
            return true
        } else if (text === null) {
            return true
        }

        return false
    }

    return (
        <>
            <p className="fs-1 my-3">Clientes</p>
            <h4>Listado de clientes</h4>
            <Row>
                <Col>
                    <Table>
                        <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Dirección
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientes.map((client, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">
                                        {client.id}
                                    </th>
                                    <th scope="row">
                                        {client.nombre}
                                    </th>
                                    <td scope="row">
                                        {client.direccion}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <hr className='my-2 text-white-50' />
                </Col>
            </Row>
            <Row>
                <Col md={6} sm={12}>
                    <h4 className='my-3'>Añadir cliente</h4>
                    {mensajeVisible && <>
                        <Alert color="info" isOpen={mensajeVisible} toggle={() => setMensajeVisible(false)}>
                            El cliente ha sido agregado exitosamente.
                        </Alert>
                    </>}
                    <Form>
                        <FormGroup>
                            <Label for="name">Nombre de cliente</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Ingrese un nombre"
                                type="text"
                                value={nombre}
                                required
                                onChange={(e) => {
                                    setNombre(e.target.value)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Dirección</Label>
                            <Input
                                id="address"
                                name="address"
                                placeholder="Ingrese una dirección"
                                type="text"
                                value={direccion}
                                required
                                onChange={(e) => {
                                    setDireccion(e.target.value)
                                }}
                            />
                        </FormGroup>
                        <FormGroup switch>
                            <Input
                                type="switch"
                                checked={clienteHabilitado}
                                onChange={() => {
                                    setClienteHabilitado(!clienteHabilitado);
                                }}
                            />
                            <Label check>Cliente habilitado</Label>
                        </FormGroup>
                        <Button type="submit" color="primary" className='mt-4' disabled={cargando} onClick={handleSaveClient}>
                            Guardar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Clientes