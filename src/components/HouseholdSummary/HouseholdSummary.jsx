import React, { useEffect, useState } from "react";
import { 
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell
 } from "semantic-ui-react";

const HouseholdSummary = (props) => {
  const {familyMembers} = props;
  const [familySalary, setFamilySalary] = useState(0);

  const calculateTotalSalary = () => {
    let total = 0;
    familyMembers.forEach(member => {
      total += member.netto;
    });
    return total;
  };

  useEffect(() => {
    setFamilySalary(calculateTotalSalary());
  }, [familyMembers]);

  return <>
  <div>
    <h2>Háztartás összesített jövedelme</h2>
    <Table celled>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Név</TableHeaderCell>
          <TableHeaderCell>Netto</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {familyMembers.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.netto} Ft</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Összesen: {familySalary}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  </>
};

export default HouseholdSummary;
