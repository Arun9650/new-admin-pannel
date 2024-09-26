// /app/dashboard/components/UserTable.tsx
"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card,  CardTitle } from "./ui/card";



const pageSize = 10; // Number of users per page

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]); // State to hold user data
  console.log("🚀 ~ UserTable ~ users:", users)
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users
  const [userWithMostPoints, setUserWithMostPoints] = useState<User>(); // User with most points
  console.log("🚀 ~ UserTable ~ userWithMostPoints:", userWithMostPoints)
  const [isLoading, setIsLoading] = useState(false); // Loading state
  // Fetch user data based on the current page
  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    const res = await fetch(`/api/users?page=${page}&limit=${pageSize}`);
    const data = await res.json();
    console.log("🚀 ~ fetchUsers ~ data:", data)
    setUsers(data.users);
    setTotalUsers(data.total);
    setUserWithMostPoints(data.userWithMostPoints);
    setIsLoading(false);
  };

  // Load data on page load and page change
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalUsers / pageSize);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="">
<div className="flex flex-col sm:flex-row w-full justify-between gap-3">
  
<Card className="p-4 sm:p-8 text-center">
    <CardTitle>
      Total User :   {totalUsers}
    </CardTitle>

    </Card>
    <Card className="p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
      <CardTitle>
        User With Most Points
      </CardTitle>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
        <div>
          Name : {userWithMostPoints?.name}
        </div>
        <div>

          Points : {userWithMostPoints?.points} 
        </div>
          League : {userWithMostPoints?.league}
      </div>
    </Card>
</div>
   
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>League</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.chatId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.points}</TableCell>
                <TableCell>{user.league}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
    </div>
  );
}
