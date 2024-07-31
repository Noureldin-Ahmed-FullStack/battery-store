// import { addDoc, collection } from "firebase/firestore";
// import data from "../myData.json";
// import { db } from "./FireBaseSetup";
// import MovieList from "./MovieList";
import { Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControlLabel, MenuItem, Paper, Select, SelectChangeEvent, Slider, Tooltip, Typography } from "@mui/material";
import { useMyContext } from './useMyContext';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";


export default function Products() {
  const [Category, setCategory] = useState('Choose Category');
  const [Sort, setSort] = useState('asc');
  const { Products, userDbData } = useMyContext();
  const [FilteredProducts, setFilteredProducts] = useState(Products);
  const [PriceRange, setPriceRange] = useState<number[]>([0, 16000]);
  const [onSaleCheck, setOnSaleCheck] = useState(false);
  const handleSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnSaleCheck(event.target.checked);
  };
  const handlePriceRangeChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], PriceRange[1] - 500), PriceRange[1]]);
    } else {
      setPriceRange([PriceRange[0], Math.max(newValue[1], PriceRange[0] + 500)]);
    }
  };
  const navigate = useNavigate();
  const goToProduct = (id: string) => {
    navigate(`/products/${id}`); // Replace '/desired-path' with your desired URL
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  // const addItems = async () => {
  //   console.log(data.data);
  //   for (let i = 0; i < data.data.length; i++) {
  //     await addDoc(collection(db, "Products"), data.data[i]);

  //   }
  // }
  useEffect(() => {
    let filtered = [];
    if (Category === 'Choose Category') {
      filtered = Products.filter(product =>
        product.price > PriceRange[0] && product.price < PriceRange[1]
      )
    } else {
      filtered = Products.filter(product =>
        product.type == Category && product.price > PriceRange[0] && product.price < PriceRange[1]
      )
    }
    if (onSaleCheck) {
      filtered = filtered.filter(product =>
        product.discount != 0
      )
    }
    if (Sort === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  }, [Category, PriceRange, Sort, onSaleCheck,Products])
  function valuetext(value: number) {
    return `${value}°C`;
  }
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <div className="container mb-4">
        {/* <button onClick={addItems} className='btn btn-info'>add items</button> */}
        <Paper className="alert text-start mt-3 w-100" sx={{ backgroundColor: 'grey-900' }}>
          <div className="row w-100">
            <div className="col-8 col-md-4 d-flex align-items-center">
              <p className="mb-0 me-3">Catergory: </p>
              <Select
                className="w-100 overflow-hidden"
                labelId="Category-select"
                id="Category-select"
                value={Category}
                label="Age"
                onChange={handleCategoryChange}
              >
                <MenuItem value={'Choose Category'}>-- Choose Category --</MenuItem>
                <MenuItem value={'Chloride EFB'}>Chloride EFB</MenuItem>
                <MenuItem value={'Chloride Platinum'}>Chloride Platinum</MenuItem>
                <MenuItem value={'Chloride Gold'}>Chloride Gold</MenuItem>
                <MenuItem value={'Chloride Extra Power'}>Chloride Extra Power</MenuItem>
                <MenuItem value={'Chloride Lithium'}>Chloride Lithium</MenuItem>
                <MenuItem value={'ACDelco'}>ACDelco</MenuItem>
                <MenuItem value={'Bosch'}>Bosch</MenuItem>
              </Select>
            </div>
            <div className="col-4 col-md-2 d-flex align-items-center">
              <FormControlLabel control={
                <Checkbox
                  color="secondary"
                  checked={onSaleCheck}
                  onChange={handleSaleChange}
                />
              } label="On sale" />
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column">
                <p className="mb-0">Price</p>
                <Slider
                  color="secondary"
                  max={16000}
                  step={100}
                  getAriaLabel={() => 'Minimum distance'}
                  value={PriceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                />
                <p>From: {PriceRange[0]} to: {PriceRange[1]}</p>
              </div>

            </div>
            <div className="col-6 col-md-3 d-flex align-items-center">
              <p className="mb-0 me-3">Sort: </p>
              <Select
                className="w-100 overflow-hidden"
                labelId="Category-select"
                id="Category-select"
                value={Sort}
                label="Age"
                onChange={handleSortChange}
              >
                <MenuItem value={'asc'}>Low to High</MenuItem>
                <MenuItem value={'desc'}>High to Low</MenuItem>
              </Select>
            </div>
          </div>
          {userDbData?.role == 'admin' ? <AddProduct /> : <></>}
        </Paper>
        <div className="row gy-3">
          {FilteredProducts?.map((product => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-3 " key={product.id}>
              <Card className="h-100">
                <CardActionArea onClick={() => goToProduct(product.id)}>
                  <CardMedia
                    className="movie-item pointer position-relative"
                    sx={{ height: 140, objectFit: 'cover' }}
                    image={product.images[0]}
                    title={product.name}
                  />
                  {product.discount ? (
                    <div className='bg-danger text-light px-2 position-absolute top-10 rounded-L-0'>{product.discount}% off</div>
                  ) : (<></>)}
                <CardContent className="text-start pb-0">
                  <Tooltip title={product.name} followCursor className="pointer">
                    <h6 className="m-0 truncate-text">{product.type + " - " + product.name}</h6>
                  </Tooltip>
                  <Typography variant="body2" color="text.secondary" className="m-0 truncate-text">

                    <Tooltip title={product.description} followCursor className="pointer">
                      <span className="m-0">{product.description}</span>
                    </Tooltip>
                  </Typography>
                </CardContent>
                <CardActions className="">
                  <h6 className="price exo-2-bold mb-0">{product.price - (product.price * product.discount / 100)} Egp.</h6> {product.discount != 0 ? <p className='mb-0 mt-2 ms-3 text-secondary text-decoration-line-through'>{product.price} EGP</p> : <p className="mb-0 mt-2 ms-3 text-secondary opacity-0 text-decoration-line-through">{product.price} EGP</p>}
                  {/* <Button size="small">Learn More</Button> */}
                </CardActions>
              </CardActionArea>
            </Card>

            </div>
          )))}
      </div>
    </div>


      {/* <Pagination count={10} onChange={handlePageChange} page={page} /> */ }
    </div >
  )
}
