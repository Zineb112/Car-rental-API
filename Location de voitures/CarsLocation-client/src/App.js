import React, {useState} from 'react';
import './App.css';
import CategoryList from './components/CategoryList';
import ProductLists from './components/ProductsList';
// import ProductsListII from './components/ProductsListII';
import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Avatar } from 'antd'
import { Menu } from 'antd';
import Icon from '@ant-design/icons';
import { Breadcrumb, Alert } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import ProductsList from './components/ProductsListII';

const { SubMenu } = Menu;


const { Header, Footer, Sider, Content } = Layout;

function App() {

  const [fragment, setfragment] = useState();
  const loadFragment= () =>{
    switch (fragment)  {
      case "ProductList":
        return <ProductLists />
      case "CategoryList":
        return <CategoryList/>
      case "ProductsList":
        return <ProductsList/>
      default:
        break;
    }
  }

  return (
    <div className="container" style={{maxWidth:'100%', padding:0}}>
        {/* <ProductLists /> */}
        {/* <CategoryList/> */}

      <Layout>
      <Header style={{padding:10}}>
        <Avatar style={{float:'right'}} src='./user.png' />
        <Title style={{color:'white'}} level={3}>IntelviaStore</Title>
      </Header>
      <Layout>
      <Sider style={{background:'balck'}}>
      <Menu
      defaultSelectedKeys={['Dashboard']}
      mode="inline"
      >
        <Menu.Item key='Dashboard'>  
        Dashboard
        </Menu.Item>
        <SubMenu
        title={
          <span>
              <icon type="mail" />
              <span>Manage</span>
          </span>
        }
        >
            <Menu.ItemGroup key='Manage'>
                <Menu.Item key='ProductLists' button onClick={e=>setfragment("ProductList")}>Manage Products</Menu.Item>
                <Menu.Item key='CategoryList' button onClick={e=>setfragment("CategoryList")}>Manage Categories</Menu.Item>
            </Menu.ItemGroup>
            
        </SubMenu>
        <Menu.Item key='ProductsList' button onClick={e=>setfragment("ProductsList")}>Products</Menu.Item>
      </Menu>
      </Sider>
      <Layout>
       <Content style={{ padding: '0 50px' }}>
       <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 693 }}> 
          {/* <ProductLists /> 
          <CategoryList/>  */} 
          {loadFragment()}        
        </div>
       </Content>
        <Footer style={{ textAlign: 'center'}}>IntelviaStore ©2021 Created By YouCode Students</Footer>
        </Layout>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
