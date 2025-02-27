import React from 'react';

interface HovertableProps {
  tablecolumns?: any[];
  tabledata?: any[];
}

export default class Hovertable extends React.Component<HovertableProps> {
  searchColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target;
    const headerCell = searchInput.parentElement;

    if (!headerCell?.parentElement?.parentElement?.nextElementSibling) return;

    const columnPosition = Array.from(headerCell.parentElement.children).indexOf(headerCell);
    const tableBody = headerCell.parentElement?.parentElement?.nextElementSibling;
    const tableRows = Array.from(tableBody.children) as HTMLElement[];

    const searchTerm = searchInput.value.trim().toLowerCase();

    tableRows.forEach(row => {
      const targetCell = row.children[columnPosition] as HTMLElement;
      const cellText = targetCell?.textContent?.trim().toLowerCase() || '';

      const isVisible = !searchTerm || cellText.includes(searchTerm);
      row.toggleAttribute('hidden', !isVisible);
    });
  };

  render() {
    const { tablecolumns, tabledata } = this.props;
    let headers, searchFields, data;

    // Head part
    if (tablecolumns?.length === 0) {
      headers = <div>Aucune colonne fournie</div>;
      searchFields = <div></div>;
    } else {
      headers = (
        <div className="hovertable-row">
          {tablecolumns?.map((val, index) => (
            <div key={index} className="hovertable-cell">
              {val.name}
            </div>
          ))}
          <div className={"hovertable-cell"}>Actions</div>
        </div>
      );

      searchFields = (
        <div className="hovertable-row">
          {tablecolumns?.map((val, index) => (
            <div key={index} className="hovertable-cell">
              {val.type === "integer" && (
                <input
                  onInput={this.searchColumn}
                  type="number"
                  name={`search${val.name}`}
                  min={1}
                  step={1}
                  placeholder="..."
                />
              )}
              {val.type === "double" && (
                <input
                  onInput={this.searchColumn}
                  type="number"
                  name={`search${val.name}`}
                  min={0.01}
                  step={0.01}
                  placeholder="..."
                />
              )}
              {val.type === "string" && (
                <input
                  onInput={this.searchColumn}
                  type="text"
                  name={`search${val.name}`}
                  min={0}
                  placeholder="..."
                />
              )}
              {val.type === "date" && (
                <input
                  onInput={this.searchColumn}
                  type="date"
                  name={`search${val.name}`}
                />
              )}
              {
                val.type === "boolean" && (
                  <select name={`searh${val.name}`} defaultValue={""}>
                    <option value={""}disabled hidden></option>
                    <option value={"true"}>Oui</option>
                    <option value={"false"}>Non</option>
                  </select>
              )}
              {val.type === "" && <span></span>}
            </div>
          ))}
          <div className={"hovertable-cell"}></div>
        </div>
      );
    }

    // Body part
    if (tabledata?.length === 0) {
      data = <div>Aucune donnée fournie</div>;
    } else {
      const children = tabledata?.map((line, index) => (
        <div key={index} className="hovertable-row">
          {line.map((donnees: any, cellIndex: number) => (
            <div key={cellIndex} className={"hovertable-cell " + (tablecolumns?.[cellIndex]?.type ?? "") + (tablecolumns?.[cellIndex]?.type === "boolean" ? " " + donnees.value : "")}>
              {tablecolumns?.[cellIndex]?.type !== "date" && donnees.value}
              {
                tablecolumns?.[cellIndex]?.type === "date" &&
                ("0" + (new Date(donnees.value)).getUTCDate()).slice(-2) + "/" +
                ("0" + ((new Date(donnees.value)).getUTCMonth()+1)).slice(-2) + "/" +
                (new Date(donnees.value)).getFullYear()
              }
            </div>
          ))}
          <div className="hovertable-cell">
            <a title="Voir les contrats" href={`/clients/${line[0].value}/contrats`}>
              <span className="material-symbols-outlined">picture_as_pdf</span>
            </a>
            <a title="Mettre à jour" href={`/clients/${line[0].value}/update`}>
              <span className="material-symbols-outlined warning">edit</span>
            </a>
            <a title="Supprimer" href={`/clients/${line[0].value}/delete`}>
              <span className="material-symbols-outlined danger">delete</span>
            </a>
          </div>
        </div>
      ));

      data = <div className="hovertable-body">{children}</div>;
    }

    return (
      <div className="hovertable" key="hovertable">
        <div className="hovertable-head">
          {headers}
          {searchFields}
        </div>
        {(tablecolumns?.length === 0 || tabledata?.length === 0) && <hr />}
        {data}
      </div>
    );
  }
}