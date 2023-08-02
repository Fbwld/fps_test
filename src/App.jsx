import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Logo from './assets/images/logo-fps.png';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function App() {
  const [negaraOptions, setNegaraOptions] = useState([]);
  const [pelabuhanOptions, setPelabuhanOptions] = useState([]);
  const [barangOptions, setBarangOptions] = useState([]);
  const [negara, setNegara] = useState('');
  const [pelabuhan, setPelabuhan] = useState('');
  const [barang, setBarang] = useState('');

  useEffect(() => {
    fetchNegaraOptions();
  }, []);

  const fetchNegaraOptions = async () => {
    try {
      const response = await fetch(
        'https://financed.4netps.co.id/ujian/negaras'
      );
      if (response.ok) {
        const data = await response.json();
        setNegaraOptions(data);
      }
    } catch (error) {
      console.error('Error fetching negara options:', error);
    }
  };

  const fetchPelabuhanOptions = async (negaraId) => {
    try {
      const response = await fetch(
        `https://financed.4netps.co.id/ujian/pelabuhans?filter={"where":{"negaraId":${negaraId}}}`
      );
      if (response.ok) {
        const data = await response.json();
        setPelabuhanOptions(data);
      }
    } catch (error) {
      console.error('Error fetching pelabuhan options:', error);
    }
  };

  const fetchBarangOptions = async (pelabuhanId) => {
    try {
      const response = await fetch(
        `https://financed.4netps.co.id/ujian/barangs?filter={"where":{"pelabuhanId":${pelabuhanId}}}`
      );
      if (response.ok) {
        const data = await response.json();
        setBarangOptions(data);
      }
    } catch (error) {
      console.error('Error fetching barang options:', error);
    }
  };

  const handleNegaraChange = (e) => {
    const selectedNegara = e.target.value;
    setNegara(selectedNegara);
    setPelabuhan('');
    setBarang('');
    fetchPelabuhanOptions(selectedNegara);
  };

  const handlePelabuhanChange = (e) => {
    const selectedPelabuhan = e.target.value;
    setPelabuhan(selectedPelabuhan);
    setBarang('');
    fetchBarangOptions(selectedPelabuhan);
  };

  const handleBarangChange = (e) => {
    setBarang(e.target.value);
  };

  return (
    <Form style={{ paddingRight: '150px', paddingLeft: '150px'}}>
      <Form.Group as={Col} md="5">
        <Form.Label
         style={{
          marginTop : '10px'
        }}
        >Negara</Form.Label>
        <Form.Control
          as="select"
          value={negara}
          onChange={handleNegaraChange}
          required
        >
          <option value="">Pilih Negara</option>
          {negaraOptions.map((negara) => (
            <option key={negara.id} value={negara.id}>
              {negara.negara}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} md="5">
        <Form.Label 
        style={{
          marginTop : '10px'
        }}
        >Pelabuhan</Form.Label>
        <Form.Control
          as="select"
          value={pelabuhan}
          onChange={handlePelabuhanChange}
          required
        >
          <option value="">Pilih Pelabuhan</option>
          {pelabuhanOptions.map((pelabuhan) => (
            <option key={pelabuhan.id} value={pelabuhan.id}>
              {pelabuhan.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} md="5">
        <Form.Label
         style={{
          marginTop : '10px'
        }}
        >Barang</Form.Label>
        <Form.Control
          as="select"
          value={barang}
          onChange={handleBarangChange}
          required
        >
          <option value="">Pilih Barang</option>
          {barangOptions.map((barang) => (
            <option key={barang.id} value={barang.id}>
              {barang.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} md="5">
          <Form.Label
           style={{
            marginTop : '10px'
          }}
          >Diskon</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Masukkan Diskon"
          />
        </Form.Group>
        <Form.Group as={Col} md="5">
          <Form.Label
           style={{
            marginTop : '10px'
          }}
          >Harga</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Masukkan Harga"
          />
        </Form.Group>
        <Form.Group as={Col} md="5">
          <Form.Label
           style={{
            marginTop : '10px'
          }}
          >Total</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Total"
          />
        </Form.Group>
      {/* Your other form controls go here */}
    </Form>
  );
}

export default App;
