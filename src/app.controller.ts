import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//@Controller() handle root route (your-domain.com/)
//@Controlller("user") your-domain.com/user or your-domain.com/user/21313
@Controller()
export class AppController {
  //this is depency injection. AppService is typescript type imported above
  constructor(private readonly appService: AppService) {}

  //method @Get handles get request for the root route
  //can also do @Get(products) then will handle get request to your-domain.com/products
  @Get()
  getHello(): string {
    //no (res, req) like express. nestjs infers and automatically sets content type header to html
    return this.appService.getHello();
  }
  // getHello(): { name: string } {
  //   //no (res, req) like express. nestjs infers and automatically sets content header to application/json based on type --check localhost in browser>networking tab
  //   return { name: 'Amie!' };
  // }
}
