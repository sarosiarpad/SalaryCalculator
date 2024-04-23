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
  <div className="flex flex-col items-start w-4/6 bg-blue-100 p-5 rounded-lg">
    <h2 className="font-bold text-2xl mb-5">Háztartás összesített jövedelme</h2>
    <Table celled >
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Név</TableHeaderCell>
          <TableHeaderCell>Netto</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {familyMembers.map((member) => (
          <TableRow key={member.id}>
            <TableCell className=" cursor-pointer">{member.name}</TableCell>
            <TableCell>{member.netto} Ft</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={2} textAlign="center">Összesen: {familySalary}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  </>
};

export default HouseholdSummary;