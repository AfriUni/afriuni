import { action, computed, observable, configure } from 'mobx';
import React from 'react';
import { enableStaticRendering } from 'mobx-react';
import client from '../apollo/client';
import { GET_CATEGORIE } from '../queries/get-categories';
import { GET_COUNTRIES } from '../queries/get-countries';
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(true);

configure({ enforceActions: 'observed' });

class HeaderStore {
  getCategories = async () => {
    const { data, loading, networkStatus } = await client.query({
      query: GET_CATEGORIE,
    });

    return {
      loading,
      networkStatus,
      data: data.categories.nodes,
    };
  };

  getLocation = async () => {
    const { data, loading, networkStatus } = await client.query({
      query: GET_COUNTRIES,
    });

    return {
      loading,
      networkStatus,
      data: data.countries.nodes,
    };
  };
}

export default HeaderStore;
