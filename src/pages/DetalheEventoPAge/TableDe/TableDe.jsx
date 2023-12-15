import React from "react";
import "./TableDe.css";

import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";

const TableTp = ({ dados }) => {
  return (
    <table className="table-data">
      {/* cabeçalho */}
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Usuario
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Comentário
          </th>
        </tr>
      </thead>

      {/* corpo */}
      <tbody>
        {dados.map((user) => {
          return (
            <tr className="table-data__head-row" key={user.idComentarioEvento}>
              <td className="table-data__data table-data__data--big">
                {user.usuario.nome}
              </td>

              <td className="table-data__data table-data__data--little">
                {user.descricao}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTp;
