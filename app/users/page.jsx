"use client";
import AsignarRoles from "@/components/AsignarRoles/AsingarRoles";
import UserTable from "@/components/UserTable/UserTable";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [roles, setRoles] = useState([]);
  const [asignedRoles, setAsignedRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState();
  const [showModal, setShowModal] = useState(false);

  // obtener los datos de la api//
  const getUsers = async () => {
    const token = localStorage.getItem("Token");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/usuario", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRoleList = async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/listRoles",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const routeList = await response.json();
        setRoles(routeList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // asignar los roles al usuario seleccionado//
  const asigneRole = (e) => {
    const roleList = [...asignedRoles];

    if (!roleList.includes(e.target.value)) {
      roleList.push(e.target.value);
    }
    setAsignedRoles(roleList);
  };

  // Seleccionad y editar al Usuario//
  const editUser = (key) => {
    getRoleList();
    setShowModal(true);

    setSelectedUser(users[key]);
    const newAsignedRoleList = [];
    users[key].roles.map((role) => {
      newAsignedRoleList.push(role.name);
    });
    setAsignedRoles(newAsignedRoleList);
  };

  // ocultar modal
  function hiddeModal(e) {
    setShowModal(false);
  }

  // revoca los roles al usuario seleccionado//
  const removeRole = (key) => {
    const newRoleList = asignedRoles.filter((role) => role !== key);
    setAsignedRoles(newRoleList);
  };

  // estructura de la tabla//
  const tbh = ["#", "Nombre Completo ", "Role", "Estado", "Operaciones"];
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <UserTable editUser={editUser} users={users} tbh={tbh} />
      {showModal && (
        <AsignarRoles
          getUsers={getUsers}
          roles={roles}
          removeRole={removeRole}
          asigneRole={asigneRole}
          asignedRoles={asignedRoles}
          selectedUser={selectedUser}
          hiddeModal={hiddeModal}
        />
      )}
    </>
  );
}
