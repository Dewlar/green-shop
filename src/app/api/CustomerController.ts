import { TokenStore } from '@commercetools/sdk-client-v2';
import { ClientResponse, Customer, MyCustomerChangePassword, MyCustomerUpdate } from '@commercetools/platform-sdk';
import CustomerRepository from './CustomerRepository';
import { UserCredentialData } from './helpers';

class CustomerController {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async loginCustomer(userData: UserCredentialData) {
    return this.customerRepository.loginCustomer(userData);
  }

  public async createAnonymousCustomer(): Promise<TokenStore> {
    return this.customerRepository.createAnonymousCustomer();
  }

  public async getCustomer(): Promise<ClientResponse<Customer>> {
    return this.customerRepository.getCustomer();
  }

  public async updateCustomer(data: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    return this.customerRepository.updateCustomer(data);
  }

  public async changeCustomerPassword(data: MyCustomerChangePassword): Promise<ClientResponse<Customer>> {
    return this.customerRepository.changeCustomerPassword(data);
  }

  public async registerCustomer(data: Customer): Promise<ClientResponse<Customer>> {
    return this.customerRepository.registerNewCustomer(data);
  }
}

export default CustomerController;
