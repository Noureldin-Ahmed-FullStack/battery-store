// import { addDoc, collection } from "firebase/firestore";
// import data from "../myData.json";
// import { db } from "./FireBaseSetup";
// import MovieList from "./MovieList";
import {Card, CardActions, CardContent, CardMedia, FormControlLabel, Paper, Switch, Tooltip, Typography } from "@mui/material";
import { useMyContext } from './useMyContext';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from "react-router-dom";

export default function Products() {
  const { Products } = useMyContext();
  const navigate = useNavigate();
  const goToProduct = (id:string) => {
    navigate(`/products/${id}`); // Replace '/desired-path' with your desired URL
  };
  // const addItems = async () => {
  //   console.log(data.data);
  //   for (let i = 0; i < data.data.length; i++) {
  //     await addDoc(collection(db, "Products"), data.data[i]);

  //   }
  // }
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <div className="container">
        {/* <button onClick={addItems} className='btn btn-info'>add items</button> */}
        <Paper className="alert text-start" sx={{ backgroundColor: 'grey-900' }}>
          <div className="d-flex align-items-center justify-content-around flex-wrap">
            <div className="d-flex align-items-center">
              <p className="mb-0 me-2">Sort by:</p>

            </div>
            <FormControlLabel control={<Switch color="secondary" defaultChecked />} label={'Ascending'} />

          </div>
        </Paper>
        <div className="row gy-3">
          {Products?.map((product => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-3 " key={product.id}>
              <Card>
                <CardActionArea onClick={()=>goToProduct(product.id)}>
                  <CardMedia
                    className="movie-item pointer"
                    sx={{ height: 140, objectFit: 'cover' }}
                    image={product.images[0]}
                    title={product.name}
                  />
                  <CardContent className="text-start pb-0">
                    <Tooltip title={product.name} followCursor className="pointer">
                      <h6 className="m-0 truncate-text">{product.name}</h6>
                    </Tooltip>
                    <Typography variant="body2" color="text.secondary" className="m-0 truncate-text">

                      <Tooltip title={product.description} followCursor className="pointer">
                        <span className="m-0">{product.description}</span>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                  <CardActions className="justify-content-between">
                    <Typography variant="body2" color="text.secondary">{product.price} Egp.</Typography>
                    {/* <Button size="small">Learn More</Button> */}
                  </CardActions>
                </CardActionArea>
              </Card>
         
            </div>
          )))}
        </div>
      </div>


      {/* <Pagination count={10} onChange={handlePageChange} page={page} /> */}
    </div>
  )
}
