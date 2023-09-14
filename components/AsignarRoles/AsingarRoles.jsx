"use client";
import { Rosario } from "next/font/google";
import React, { useState } from "react";

export default function AsignarRoles({
  getUsers,
  roles,
  removeRole,
  asigneRole,
  selectedUser,
  asignedRoles,
  hiddeModal,
}) {
  const [formData, setFormData] = useState({
    name: "Hola Jorge",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");
    const url = `http://127.0.0.1:8000/api/admin/assignRoleToUser/${selectedUser.id}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: asignedRoles }),
      });
      if (response.ok) {
        getUsers();
        hiddeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex items-center justify-center w-full h-screen flex-col absolute top-0 right-0 bg-slate-400 bg-opacity-30 z-50">
      <div className="w-96 h-fit rounded-lg p-10 shadow-lg bg-slate-600">
        <h2 className="text-2xl text-white w-full text-center">
          Asignar Roles
        </h2>

        <h1>{selectedUser.name}</h1>

        <form className=" flex flex-col gap-4">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Role
          </label>
          <select
            onChange={asigneRole}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Choose a Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>

          <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
            {asignedRoles.map((assignedRole, i) => (
              <li key={i} className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>{assignedRole}</span>
                <span
                  className="cursor-pointer hover:text-red-800"
                  onClick={() => removeRole(assignedRole)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
              </li>
            ))}
          </ul>

          <div className=" flex w-full justify-between">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Guardar
            </button>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-800"
              onClick={hiddeModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
