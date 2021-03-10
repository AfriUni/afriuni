import { enableStaticRendering, useStaticRendering } from 'mobx-react';
import HeaderStore from './headerStore';
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(true);

class RootStore {
  constructor() {
    this.header = new HeaderStore();
  }
}

const Stores = new RootStore();

export default Stores;
