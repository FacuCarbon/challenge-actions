/// HOOKS
import { useState, useEffect, ChangeEvent } from "react";
import { useActions } from "../providers/ActionsProvider";
import { useNavigate } from "react-router-dom";

/// COMPONENTS
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

/// ICONS

/// INTERFACES
import { ResponseStock, Stock } from "../utils/Types";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import ButtonFavorite from "./Button-favorite";

const Table = () => {
  // declared hooks
  const { retrieveStocks } = useActions();
  const navigate = useNavigate();
  // declared states
  const [data, setData] = useState<ResponseStock>();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    symbol: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await retrieveStocks({});
      if (response?.ok) {
        const currentList = await response?.json();

        setData(currentList);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("Error in retrieve list stocks ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const onGlobalFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let _filters = { ...filters };

    if ("value" in _filters["global"]) {
      _filters["global"].value = value;
    }

    setFilters(_filters);
  };

  const renderHeader = () => {
    let value = "";
    if (filters["global"] && "value" in filters["global"]) {
      value = filters["global"].value;
    }

    return (
      <span className="p-input-icon-left">
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e)}
          placeholder="Search symbol or name..."
          style={{ paddingLeft: "0.5rem" }}
        />
      </span>
    );
  };

  const header = renderHeader();
  const handleSelected = (event: Stock) => {
    navigate(`/details/${event?.symbol}/${event?.exchange}`);
  };

  return (
    <div className="custom__table">
      {!loading ? (
        <DataTable
          value={data?.data}
          paginator
          totalRecords={data?.count}
          rows={25}
          header={header}
          scrollable
          showGridlines
          scrollHeight="51vh"
          emptyMessage="No stock found."
          size="normal"
          filterDisplay="menu"
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
          selectionMode={"single"}
          onSelectionChange={(event) => handleSelected(event?.value)}
        >
          <Column field="symbol" filterField="symbol" header="Symbol" />
          <Column field="name" filterField="name" header="Name" />
          <Column field="exchange" header="Exchange" />
          <Column field="currency" header="Currency" />
          <Column field="type" header="Type" />
          <Column
            header="Action"
            body={(rowData: Stock) => <ButtonFavorite stock={rowData} />}
          />
        </DataTable>
      ) : (
        <p className="details__containerBody__containerMessages__message">
          Loading data...
        </p>
      )}
    </div>
  );
};

export default Table;
