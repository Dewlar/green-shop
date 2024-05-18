import { TokenStore } from '@commercetools/sdk-client-v2';
import CustomerRepository from './CustomerRepository';
import { ApiLoginResult, UserCredentialData } from './helpers';

class CustomerController {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async loginCustomer(userData: UserCredentialData): Promise<ApiLoginResult> {
    return this.customerRepository.loginCustomer(userData);
  }

  public async createAnonymousCustomer(): Promise<TokenStore> {
    return this.customerRepository.createAnonymousCustomer();
  }
}

export default CustomerController;
