import React, { useEffect } from 'react';
import FamilyTree from '../familytree'; // Certifique-se de que está importando corretamente

function FamilyTreeComponent({ data, onEdit, onDelete }) {
  useEffect(() => {
    if (data && data.length > 0) {
      const family = new FamilyTree(document.getElementById('tree'), {
        
        enableSearch: false,
        
        nodeBinding: {
          field_0: "name",
        },
        nodes: data.map(person => ({
          id: person.id,
          ...(person.partnerId ? { pids: [person.partnerId] } : {}),
          ...(person.fatherId ? { fid: person.fatherId } : {}),
          ...(person.motherId ? { mid: person.motherId } : {}),
          name: person.name,
          gender: person.gender.toLowerCase(),
        })),
        nodeMenu: {
          edit: {
            text: "Edit",
            onClick: (nodeId) => {
              // Certifique-se de que nodeId está correto
              const person = data.find(p => p.id === nodeId);
              if (person) {
                onEdit(person);
              } else {
                console.error(`Person with ID ${nodeId} not found.`);
              }
            }
          },
          remove: {
            text: "Remove",
            onClick: (nodeId) => {
              // Certifique-se de que nodeId está correto
              const person = data.find(p => p.id === nodeId);
              if (person) {
                onDelete(nodeId);
              } else {
                console.error(`Person with ID ${nodeId} not found.`);
              }
            }
          },
        }
      });
    }
  }, [data, onEdit, onDelete]);

  return <div id="tree" style={{ width: '100%', height: '100%', background: 'transparent' }}></div>;
}

export default FamilyTreeComponent;