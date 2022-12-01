import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Product from "../components/Product"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios"
import { mobile } from '../responsive'






const Container = styled.div`
  text-align: center;
  height: 100%;
`



const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items : center;
  padding:30px;
`

const Hr = styled.hr`
  width: 70vw;
  height: 2px;
  ${mobile({display:"none"})}
`

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
`
const Select = styled.select`

`

const Option = styled.option`

`

const CheckBox = styled.input`
`

const FilterTitle = styled.div`
    text-align: right;
   

`

const ProductsHeadline = styled.h1`
  margin-left: 14px;
  ${mobile({fontSize:"22px"})}
`

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding:20px;
`


const Products = () => {

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState("newest");
    const [products, setProducts] = useState([]);

    

    const handlePage = (event, page) => {
      setPage(page)
    }

    const handleFilter = (e) => {
      let filterArray = [...filter]

      if(!filterArray.includes(e.target.value)) {
        filterArray.push(e.target.value)
        setFilter(filterArray)

      } else {
        let pos = filterArray.indexOf(e.target.value)
        filterArray.splice(pos,1)
        setFilter(filterArray)
      }

    }

    
    const handleSort = (e) => {
      setSort(e.target.value)
    }

    
    useEffect(() => {
      const limit = 4;
      const getProducts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:9000/api/products/?page=${page}&sort=${sort}&filter=${filter}&limit=${limit}`
            )
          setProducts(res.data.products);
          let maxPageNumber = res.data.pageNumber / limit;
          let pageNumberCeiled = Math.ceil(maxPageNumber)
          
          setMaxPage(pageNumberCeiled)
          
        } catch(e) {


        }
      }
      getProducts();
    },[filter,page,sort])

   


  return (
    <div>
      <Header/>
      <Container>
        <Top>
          <Filters>
          <FilterTitle>Bender<CheckBox type="checkbox" value="Bender" onChange={handleFilter} /> </FilterTitle>
          <FilterTitle>Deen <CheckBox type="checkbox" value="Deen" onChange={handleFilter} /> </FilterTitle> 
          <FilterTitle>Earphone <CheckBox type="checkbox" value="Earphone" onChange={handleFilter} />  </FilterTitle>
          <FilterTitle>EOH <CheckBox type="checkbox" value="EOH" onChange={handleFilter} /> </FilterTitle> 
          <FilterTitle>Gerson <CheckBox type="checkbox" value="Gerson" onChange={handleFilter} />  </FilterTitle>
          <FilterTitle>LSD <CheckBox type="checkbox" value="LSD" onChange={handleFilter} /> </FilterTitle>
            </Filters>  
          <ProductsHeadline> ALL GUITARS  </ProductsHeadline>
          <Hr/>
          <Filters>
            <Select onChange={handleSort} >
              <Option> newest </Option>
              <Option> ascending </Option>
              <Option> descending </Option>
              <Option> popular </Option>
            </Select>
          </Filters>
        </Top>
        <ProductsContainer>
          {products.map((item) => (
            <Product item = {item} key = {item._id} />
          ))}
        </ProductsContainer>

        <Stack spacing={2}>
      
      <Pagination onChange={handlePage} count={maxPage} variant="outlined" shape="rounded" style={{display:"flex", justifyContent:"center"}} />
    </Stack>
        
      </Container>
      <Footer/>
    </div>
  )
}

export default Products
