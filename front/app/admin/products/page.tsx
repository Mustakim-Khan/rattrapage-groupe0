"use client";

import {
  Button,
  CircularProgress,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Switch,
  Table,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Edit3, Search, Trash } from "react-feather";
import { Category } from "../categories/page";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  title: string;
  pa: number;
  pv: number;
  pht: number;
  expireDate: string;
  isAvailable: boolean;
};

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function Products() {
  const router = useRouter();
  const productUrl = "http://localhost:8000/api/products";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [data, setData] = useState<{ isEdit: boolean; data: Product }>({
    isEdit: false,
    data: {
      id: "",
      title: "",
      pa: 0,
      pv: 0,
      pht: 0,
      expireDate: new Date().toJSON(),
      isAvailable: false,
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const getCategories = async () => {
    fetch("http://localhost:8000/api/categories", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setCategories(result);
            // setLoading(false);
          },
          (error) => {
            setError(error);
            // setLoading(false);
          }
        );
  }
  const handleEditProduct = (data: Product) => {
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

  const handleDeleteProduct = (data: Product) => {
    fetch(productUrl + `/${data.id}`, {
      method: "DELETE",
    }).then((res) => {
      console.log("data => ", res);
      setProducts((prev) => prev.filter((p: Product) => p.id !== data.id));
    });
  };

  const handleAddProduct = (data: Product) => {
    fetch(productUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/ld+json",
        Accept: "application/json",
      },
    }).then((res) => {
      console.log("data => ", res);
      setProducts((prev: Product[]) => {
        let d = [...prev]
        d.push(data)
        return d
      });
    // router.refresh();
    });
  };

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
          setProducts(result);
          setLoading(false);
          getCategories();
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  }, []);

  return (
    <>
      <Button
        variant="solid"
        sx={{ color: "#fff", bgcolor: "#000 !important", my: 2}}
        onClick={() => setOpen(true)}
      >
        Ajouter
      </Button>
      <div className="flex justify-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Title</th>
                <th>Prix d'achat</th>
                <th>Prix de vente</th>
                <th>Prix acheté</th>
                <th>Date de péremptions</th>
                <th>Disponible</th>
                <th>Voir</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.pa}</td>
                  <td>{product.pv}</td>
                  <td>{product.pht}</td>
                  <td>{formatDate(new Date(product.expireDate))}</td>
                  <td>{product.isAvailable ? "Disponible" : "Indisponible"}</td>
                  <td className="hover:cursor-pointer">
                    <IconButton
                      onClick={() => {
                        setData((prev) => {
                          return { isEdit: true, data: product };
                        });
                        setOpen(true);
                        // router.push(`/categories/${category.id}`)
                      }}
                    >
                      <Edit3 />
                    </IconButton>
                  </td>
                  <td className="hover:cursor-pointer">
                    <IconButton
                      onClick={() => {
                        handleDeleteProduct(product);
                      }}
                    >
                      <Trash />
                    </IconButton>
                  </td>
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
              ></Input>
              <Input
                type="number"
                defaultValue={data.data.pa}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };

                    d.data.pa = Number.parseInt(e.target.value);
                    return { ...d };
                  });
                }}
              ></Input>
              <Input
                type="number"
                defaultValue={data.data.pv}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };

                    d.data.pv = Number.parseInt(e.target.value);
                    return { ...d };
                  });
                }}
              ></Input>
              <Input
                type="number"
                defaultValue={data.data.pht}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };

                    d.data.pht = Number.parseInt(e.target.value);
                    return { ...d };
                  });
                }}
              ></Input>
              <Input
                type="date"
                defaultValue={new Date(data.data.expireDate).toString()}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };

                    d.data.expireDate = e.target.value;
                    return { ...d };
                  });
                }}
              ></Input>
              <Switch
                startDecorator={"Disponible"}
                checked={data.data.isAvailable}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };

                    d.data.isAvailable = e.target.checked;
                    return { ...d };
                  });
                }}
              ></Switch>
              <Select>
                {categories.length > 0 ? categories.map((c: Category) => (
                   <Option value={c.id}>{ c.title }</Option> 
                ))
                : <></>   
                }
              </Select>
              <Button
                sx={{ color: "#fff", bgcolor: "#000 !important" }}
                onClick={() => {
                    data.isEdit ? handleEditProduct(data.data) : handleAddProduct(data.data)
                  
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
