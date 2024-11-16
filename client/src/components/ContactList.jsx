import React, { useState, useEffect } from 'react';
import baseUrl from '../url.js';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
} from '@mui/material';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editContact, setEditContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [page]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/contacts?page=${page}&limit=5`);
      console.log(response)
      setContacts(response.data.contacts || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`${baseUrl}/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Open Edit Dialog
  const handleEdit = (contact) => {
    setEditContact(contact);
    setOpenDialog(true);
  };

  // Save Edited Contact
  const saveContact = async () => {
    setIsSaving(true);
    try {
      await axios.put(`${baseUrl}/contacts/${editContact._id}`, editContact);
      setOpenDialog(false);
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Box sx={{ width: '90%', maxWidth: 800 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Contact List</Typography>
        <Box sx={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact.firstName} {contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(contact)}>Edit</Button>
                    <Button onClick={() => handleDelete(contact._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Pagination Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button disabled={page === 1 || contacts.length === 0} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Typography sx={{ mx: 2 }}>{page} / {totalPages}</Typography>
          <Button disabled={page === totalPages || contacts.length === 0} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </Box>

        {/* Edit Contact Dialog */}
        {openDialog && (
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogContent>
              <TextField
                label="First Name"
                value={editContact.firstName}
                onChange={(e) => setEditContact({ ...editContact, firstName: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Last Name"
                value={editContact.lastName}
                onChange={(e) => setEditContact({ ...editContact, lastName: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Email"
                value={editContact.email}
                onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Phone Number"
                value={editContact.phoneNumber}
                onChange={(e) => setEditContact({ ...editContact, phoneNumber: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Company"
                value={editContact.company}
                onChange={(e) => setEditContact({ ...editContact, company: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Job Title"
                value={editContact.jobTitle}
                onChange={(e) => setEditContact({ ...editContact, jobTitle: e.target.value })}
                fullWidth
                margin="dense"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={saveContact} disabled={isSaving}>
                {isSaving ? <CircularProgress size={24} /> : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default ContactList;
