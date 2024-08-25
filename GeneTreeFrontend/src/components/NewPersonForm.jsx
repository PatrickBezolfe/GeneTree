import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import NativeSelect from '@mui/material/NativeSelect';
import { useForm } from 'react-hook-form';
import instance from '../axios-config';

function NewPersonForm({ onSave, onClose, personToEdit }) {
  const { register, handleSubmit, reset, setValue, formState: { isValid } } = useForm({ mode: 'onChange' });
  const [idCounter, setIdCounter] = useState(1);
  const [persons, setPersons] = useState([]);
  const [partners, setPartners] = useState([]);
  const [fathers, setFathers] = useState([]);
  const [mothers, setMothers] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await instance.get('/persons');
        const persons = response.data;

        // Encontrar o maior ID existente
        const maxId = persons.reduce((max, person) => person.id > max ? person.id : max, 0);
        
        // Setar o próximo ID, se não for uma edição
        if (!personToEdit) {
          setIdCounter(maxId + 1);
          setValue('id', maxId + 1); // Setar o ID no formulário
        } else {
          // Se for edição, setar os valores do formulário com os dados da pessoa
          setValue('id', personToEdit.id);
          setValue('name', personToEdit.name);
          setValue('gender', personToEdit.gender);
          setValue('partnerId', personToEdit.partnerId || '');
          setValue('fatherId', personToEdit.fatherId || '');
          setValue('motherId', personToEdit.motherId || '');
        }

        setPersons(persons);
        setPartners(persons);
        setFathers(persons.filter(person => person.gender === 'Male'));
        setMothers(persons.filter(person => person.gender === 'Female'));
      } catch (error) {
        console.error('Error fetching persons:', error);
      }
    };

    fetchPersons();
  }, [setValue, personToEdit]);

  const onSubmit = (data) => {
    if (isValid) {
      onSave(data);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{personToEdit ? 'Edit Person' : 'New Person'}</h2>

      {/* Inputs em linha reta */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Input
          {...register('name', {
            onChange: () => {
              if (!personToEdit) {
                setValue('id', idCounter);
              }
            }
          })}
          placeholder="Name"
          required
        />

        <NativeSelect defaultValue="" style={{ flexGrow: .5 }} {...register('gender')} required>
          <option value="" disabled hidden>Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </NativeSelect>

        {/* Campo de ID sempre visível */}
        <Input
          style={{ flexBasis: '20%' }}
          {...register('id')}
          placeholder="ID"
          readOnly
        />
      </div>

      {/* Inputs em coluna */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', width: '50%' }}>
        <NativeSelect defaultValue="" {...register('partnerId')}>
          <option value="" disabled hidden>Partner ID</option>
          {partners.map(person => (
            <option key={person.id} value={person.id}>{person.name} (ID: {person.id})</option>
          ))}
        </NativeSelect>

        <NativeSelect defaultValue="" {...register('fatherId')}>
          <option value="" disabled hidden>Father ID</option>
          {fathers.map(person => (
            <option key={person.id} value={person.id}>{person.name} (ID: {person.id})</option>
          ))}
        </NativeSelect>

        <NativeSelect defaultValue="" {...register('motherId')}>
          <option value="" disabled hidden>Mother ID</option>
          {mothers.map(person => (
            <option key={person.id} value={person.id}>{person.name} (ID: {person.id})</option>
          ))}
        </NativeSelect>
      </div>

      {/* Botões de Ação */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button type="button" variant="text" onClick={handleCancel}>Cancel</Button>
        <Button type="submit" variant="text">Save</Button>
      </div>
    </form>
  );
}

export default NewPersonForm;