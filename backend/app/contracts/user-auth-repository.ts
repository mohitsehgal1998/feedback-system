export default interface UserAuthRepository {
	login(userData: any): Promise<any>;
	register(userData: any): Promise<any>;
  }
  