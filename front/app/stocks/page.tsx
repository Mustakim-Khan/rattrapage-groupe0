"use client";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
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
import { Edit3, Layers, Search, Trash } from "react-feather";
import { Category } from "@/app/admin/categories/page";
import { Product, formatDate } from "@/app/admin/products/page";

export type Stock = {
  id: string;
  supplierName: string,
  quantity: number,
  totalPriceHT?: number,
  totalPriceTC?: number,
  deliveryPrice?: number,
  vehicleType?: string,
  vehicleNumberplate?: string,
  rayonName?: string,
  destruction_reason?: string,
  product: string,
  rayonSetter?: string,
  datetime: string;
  status: string;
};

export function getProductById(id: string, productList: Product[]): Product {
    return productList.filter((p: Product) => p.id == id)[0]
}

export default function Products() {
  const stockUrl = "http://localhost:8000/api/stocks";
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [data, setData] = useState<{ isEdit: boolean, data: Stock }>({
    isEdit: false,
    data: {
      id: "",
      supplierName: "",
      totalPriceHT: 0,
      totalPriceTC: 0,
      deliveryPrice: 0,
      vehicleType: "",
      vehicleNumberplate: "",
      rayonName: "",
      destruction_reason: "",
      product: "",
      rayonSetter: "",
      datetime: new Date().toJSON(),
      status: "",
      quantity: 0,
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const getProducts = async () => {
    fetch("http://localhost:8000/api/products", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setProducts(result);
          },
          (error) => {
            setError(error);
          }
        );
  }
  const handleEditStock = (data: Stock) => {
    fetch(stockUrl + `/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify({...data}),
      headers: {
        "Content-Type": "application/merge-patch+json",
        Accept: "application/json",
      },
    }).then((res) => {
      setData({
        isEdit: false,
        data: {
            id: "",
            supplierName: "",
            totalPriceHT: 0,
            totalPriceTC: 0,
            deliveryPrice: 0,
            vehicleType: "",
            vehicleNumberplate: "",
            rayonName: "",
            destruction_reason: "",
            product: "",
            rayonSetter: "",
            datetime: new Date().toJSON(),
            status: "",
            quantity: 0,
          },
      })
    });
  };

  const handleDeleteStock = (data: Stock) => {
    fetch(stockUrl + `/${data.id}`, {
      method: "DELETE",
    }).then((res) => {
      setStocks((prev) => prev.filter((p: Stock) => p.id !== data.id));
    });
  };

  const handleAddStock = (data: Stock) => {
    const newData = {...data, };
    fetch(stockUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/ld+json",
        Accept: "application/json",
      },
    }).then((res) => {
      // console.log("data => ", res);
      setStocks((prev: Stock[]) => {
        let d = [...prev]
        d.push(data)
        return d
      });
      setData({
        isEdit: false,
        data: {
            id: "",
            supplierName: "",
            totalPriceHT: 0,
            totalPriceTC: 0,
            deliveryPrice: 0,
            vehicleType: "",
            vehicleNumberplate: "",
            rayonName: "",
            destruction_reason: "",
            product: "",
            rayonSetter: "",
            datetime: new Date().toJSON(),
            status: "",
            quantity: 0,
          },
      })
    });
  };

  useEffect(() => {
    fetch(stockUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setStocks(result);
          getProducts();
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  }, []);

  return (
    <Stack p={2}>
      <Typography level="title-lg" startDecorator={<Layers></Layers>}>Liste des Stocks</Typography>
      <Button
        variant="solid"
        sx={{ color: "#fff", bgcolor: "#000 !important", my: 2, width: "auto"}}
        onClick={() => setOpen(true)}
      >
        Ajouter
      </Button>
      <div className="flex justify-center m-3">
        {loading ? (
          <CircularProgress />
        ) : (
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: "6%" }}>Nom du Produit</th>
                <th>Fournisseur/Véhicule</th>
                <th>Quantité</th>
                <th>Prix d'achat HT</th>
                <th>Prix de vente Total HT</th>
                <th>Prix de Livraison</th>
                <th>Date</th>
                <th>Status</th>
                <th>Nom du rayon</th>
                <th>Agent de mise en rayon</th>
                <th>Motif de destruction</th>
                <th>Voir</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
                  <td>{{...getProductById(stock.product.split("/").slice(-1)[0], products)}.title ?? "Nom"}</td>
                  <td>{stock.supplierName +"/"+stock.vehicleType+"/"+stock.vehicleNumberplate}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.totalPriceHT}</td>
                  <td>{stock.totalPriceTC}</td>
                  <td>{stock.deliveryPrice}</td>
                  <td>{formatDate(new Date(stock.datetime))}</td>
                  <td>{stock.status}</td>
                  <td>{stock.rayonName}</td>
                  <td>{stock.rayonSetter}</td>
                  <td>{stock.destruction_reason}</td>
                  <td className="hover:cursor-pointer">
                    <IconButton
                      onClick={() => {
                        setData({ isEdit: true, data: {...stock} });
                        setOpen(true);
                      }}
                    >
                      <Edit3 />
                    </IconButton>
                  </td>
                  <td className="hover:cursor-pointer">
                    <IconButton
                      onClick={() => {
                        handleDeleteStock(stock);
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
      <Modal open={open} onClose={() => {
        setData({
          isEdit: false,
          data: {
            id: "",
            supplierName: "",
            totalPriceHT: 0,
            totalPriceTC: 0,
            deliveryPrice: 0,
            vehicleType: "",
            vehicleNumberplate: "",
            rayonName: "",
            destruction_reason: "",
            product: "",
            rayonSetter: "",
            datetime: new Date().toJSON(),
            status: "",
            quantity: 0,
          },
        })
        setOpen(false)
      }} sx={{width: "auto"}}>
        <ModalDialog>
          <form>
            <Stack sx={{ alignItems: "center", width: "100%" }} gap={1}>
              <ModalClose></ModalClose>
              <Typography level="body-lg" fontWeight={"bold"}>
                {data.isEdit ? "Editer Stock" : "Ajouter Stock"}
              </Typography>
              <FormControl required>
                <FormLabel>Produit</FormLabel>
                <Select defaultValue={data.data.product.split("/").slice(-1)[0]} onChange={(e, newValue) => {
                  setData((prev) => {
                    return { ...prev, data: {...prev.data, category: `/api/products/${newValue}`} };
                  });
                }}>
                  {products.length > 0 ? products.map((p: Product) => (
                    <Option key={p.id} value={p.id}>{ p.title }</Option> 
                    ))
                    : <></>   
                  }
                </Select>
              </FormControl>
              <FormControl required>
                <FormLabel>Fournisseur</FormLabel>
                <Input
                defaultValue={data.data.supplierName}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };
                    d.data.supplierName = e.target.value;
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>Model du véhicule</FormLabel>
                <Input
                defaultValue={data.data.vehicleType}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };
                    d.data.vehicleType = e.target.value;
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>Matricule du véhicule</FormLabel>
                <Input
                defaultValue={data.data.vehicleNumberplate}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };
                    d.data.vehicleNumberplate = e.target.value;
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>Qté</FormLabel>
                <Input
                type="number"
                defaultValue={data.data.quantity}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };

                    d.data.quantity = Number.parseInt(e.target.value);
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>PrixTte HT</FormLabel>
                <Input
                type="number"
                defaultValue={data.data.totalPriceHT}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };

                    d.data.totalPriceHT = Number.parseInt(e.target.value);
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>PrixTte TTC</FormLabel>
                <Input
                type="number"
                defaultValue={data.data.totalPriceTC}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };
                    d.data.totalPriceTC = Number.parseInt(e.target.value);
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>Prix de livraison</FormLabel>
                <Input
                type="number"
                defaultValue={data.data.deliveryPrice}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };
                    d.data.deliveryPrice = Number.parseInt(e.target.value);
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>Date</FormLabel>
                <Input
                type="date"
                defaultValue={new Date(data.data.datetime).toString()}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };
                    d.data.datetime = e.target.value;
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>Nom du rayon</FormLabel>
                <Input
                defaultValue={data.data.rayonName}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };
                    d.data.rayonName = e.target.value;
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              <FormControl required>
                <FormLabel>Agent de mise en rayon</FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>Motif de la destruction</FormLabel>
                <Input
                type="text"
                defaultValue={data.data.destruction_reason}
                onChange={(e) => {
                  setData((prev) => {
                    let d = { ...prev };
                    d.data.destruction_reason = e.target.value;
                    return { ...d };
                  });
                }}
              />
              </FormControl>
              
              <Button
                sx={{ color: "#fff", bgcolor: "#000 !important" }}
                onClick={() => {
                    data.isEdit ? handleEditStock(data.data) : handleAddStock(data.data)
                    
                    setOpen(false);
                }}
              >
                {data.isEdit ? "Editer" : "Ajouter"}
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </Stack>
  );
}


// allergies
// : 
// []
// category
// : 
// "/api/categories/3"
// expireDate
// : 
// "2024-02-22T06:24:28+00:00"
// id
// : 
// 1
// ingredients
// : 
// []
// isAvailable
// : 
// true
// pa
// : 
// 10.5
// pht
// : 
// 12.5
// pv
// : 
// 15.5
// stock
// : 
// "/api/stocks/1"
// title
// : 
// "Product 1"