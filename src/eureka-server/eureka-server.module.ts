import { Module } from '@nestjs/common';
// import { EurekaModule } from 'nestjs-eureka';

@Module({
  imports: [
    // EurekaModule.forRoot({
    //   eureka: {
    //     host: 'payall-serveur-decouverte-service',
    //     port: 8761,
    //     registryFetchInterval: 3000,
    //     servicePath: '/eureka/apps/',
    //     maxRetries: 3,
    //   },
    //   service: {
    //     name: 'payall-gestion-commande-service',
    //     port: 3030,
    //   },
    // }),
  ],
})
export class EurekaServerModule {}
