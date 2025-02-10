import React from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function OrdersByDate({ startDate, endDate }) {
  // Group pedidos by client and prepare columns for Excel
  const prepareDataForExcel = (pedidos) => {
    const grouped = {};
    for (const p of pedidos) {
      const key = p.ciCliente; // Adjust field name if needed
      if (!grouped[key]) {
        grouped[key] = {
          nombreCliente: p.nombreCliente, // Adjust field names as in your DB
          apellidoCliente: p.apellidoCliente,
          ciCliente: p.ciCliente,
          tipoNegocio: p.tipoNegocio,
          cantidadPedidos: 0,
        };
      }
      grouped[key].cantidadPedidos++;
    }
    return Object.values(grouped);
  };

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos_Clientes');

    // Add table headers
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Nombre Cliente", "Apellido Cliente", "CI Cliente", "Tipo Negocio", "Cantidad de Pedidos"]
    ], { origin: "A1" });

    // Adjust column widths
    const wscols = [
      { wch: 20 }, // "Nombre Cliente" column width
      { wch: 20 }, // "Apellido Cliente" column width
      { wch: 15 }, // "CI Cliente" column width
      { wch: 20 }, // "Tipo Negocio" column width
      { wch: 20 }  // "Cantidad de Pedidos" column width
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, 'Reporte_Clientes.xlsx');
  };

  // Called by the parent or on button click; uses the parent-provided dates
  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pedidos/rango-fechas', {
        params: { startDate, endDate },
      });
      const finalData = prepareDataForExcel(response.data);
      exportToExcel(finalData);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  return (
    <div>
      <h4>Lista de clientes que realizaron pedidos</h4>
      <p>Rango: {startDate} - {endDate}</p>
      <button className="btn btn-primary mt-3 w-100" onClick={handleGenerateReport}>
        Generar Reporte
      </button>
    </div>
  );
}

export default OrdersByDate;