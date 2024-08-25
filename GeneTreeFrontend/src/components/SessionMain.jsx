import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import FamilyTreeComponent from './FamilyTreeComponent';
import BasicModal from './BasicModal';
import instance from '../axios-config';

function SessionMain() {
  const { data, refetch } = useQuery({
    queryKey: ['persons'],
    queryFn: () => instance.get('/persons'),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);

  const mutationCreatePerson = useMutation({
    mutationFn: (newPerson) => instance.post('/persons', newPerson),
    onSuccess: () => {
      refetch();
      setModalOpen(false); // Fecha o modal após salvar
    },
  });

  const mutationEditPerson = useMutation({
    mutationFn: (updatedPerson) => instance.put(`/persons/${updatedPerson.id}`, updatedPerson),
    onSuccess: () => {
      refetch();
      setModalOpen(false); // Fecha o modal após salvar
    },
    onError: (error) => console.error("Error updating person:", error),
  });

  const mutationDeletePerson = useMutation({
    mutationFn: (personId) => instance.delete(`/persons/${personId}`),
    onSuccess: () => refetch(),
    onError: (error) => console.error("Error deleting person:", error),
  });

  const handleSave = (personData) => {
    if (personToEdit) {
      mutationEditPerson.mutate(personData);
    } else {
      mutationCreatePerson.mutate(personData);
    }
  };

  const handleEdit = (person) => {
    setPersonToEdit(person);
    setModalOpen(true);
  };

  const handleDelete = (personId) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      const id = parseInt(personId, 10); // Garantir que o ID é um número
      mutationDeletePerson.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setPersonToEdit(null);
    setModalOpen(false);
  };

  return (
    <>
      <BasicModal
        onSave={handleSave}
        onClose={handleCloseModal}  // Corrigido: Passa a função handleCloseModal aqui
        open={modalOpen}  // Passa o estado do modal
        personToEdit={personToEdit}  // Passa os dados da pessoa a ser editada
      />
      <div className="session">
        {data?.data?.length > 0 && (
          <FamilyTreeComponent
            data={data.data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}

export default SessionMain;