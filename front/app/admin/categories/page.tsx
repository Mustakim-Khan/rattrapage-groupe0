"use client";

import {
  Button,
  CircularProgress,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Edit3, Search, Trash } from "react-feather";

export type Category = {
  id: string;
  title: string;
};

export default function Products() {
  const router = useRouter();
  const productUrl = "http://localhost:8000/api/categories";
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<{ isEdit: boolean; data: Category }>({
    isEdit: false,
    data: { id: "", title: "" },
  });

  const handleEditCategory = (data: Category) => {
    fetch(productUrl + `/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: data.title }),
      headers: {
        "Content-Type": "application/merge-patch+json",
        Accept: "application/json",
      },
    }).then((res) => {
      console.log("data => ", res);
    });
  };

  const handleDeleteCategory = (data: Category) => {
    fetch(productUrl + `/${data.id}`, {
        method: "DELETE",
      }).then((res) => {
        console.log("data => ", res);
      });
  }

  useEffect(() => {
    fetch(productUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setCategories(result);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  }, []);

  return (
    <>
      <div className="flex justify-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Title</th>
                <th>Voir</th>
                {/* <th>Supprimer</th> */}
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.title}</td>
                  <td className="hover:cursor-pointer">
                    <IconButton
                      onClick={() => {
                        setData((prev) => {
                          return { isEdit: true, data: category };
                        });
                        setOpen(true);
                        // router.push(`/categories/${category.id}`)
                      }}
                    >
                      <Edit3 />
                    </IconButton>
                  </td>
                  {/* <td className="hover:cursor-pointer">
                    <IconButton
                      onClick={() => {
                        handleDeleteCategory(category);
                      }}
                    >
                      <Trash />
                    </IconButton>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <form>
            <Stack sx={{ alignItems: "center" }} gap={1}>
              <ModalClose></ModalClose>
              <Typography>
                {data.isEdit ? "Edit Categorie" : "Add Categorie"}
              </Typography>
              <Input
                defaultValue={data.data.title}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };

                    d.data.title = e.target.value;
                    return { ...d };
                  });
                }}
              >
              </Input>
              <Button
                sx={{ color: "#fff", bgcolor: "#000 !important" }}
                onClick={() => {
                  handleEditCategory(data.data);
                  setOpen(false);
                }}
              >
                {data.isEdit ? "Editer" : "Ajouter"}
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
