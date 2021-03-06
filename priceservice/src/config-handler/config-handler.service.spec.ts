import { Test, TestingModule } from '@nestjs/testing';
import { ConfigHandlerService } from './config-handler.service';
import { ConfigDTO } from './dto/config.dto';
import { ConfigModule } from '@nestjs/config';

/**
 * This is the test class for the config-handler service which comprises
 * several tests that probe the result of the functions of the config-handler
 * service.
 */
describe('ConfigHandlerService', () => {
  let confHandService: ConfigHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigHandlerService],
      imports: [ConfigModule]
    }).compile();

    confHandService = module.get<ConfigHandlerService>(ConfigHandlerService);
  });

  /**
   * This test function assess whether the corresponding breaker config is set
   * in the config-handler class once a valid breaker config object has been passed
   */
  it('should set the breaker config according to user input', async () => {
    const breakerConfig: ConfigDTO = {
      breaker: 'consecutive',
      timeoutDuration: 8000,
      resetDuration: 5000,
      monitorDuration: 10000,
      threshold: 0.5,
      minimumRequests: 1,
      consecutiveFailures: 6,
    };
    confHandService.setBreakerConfig(breakerConfig);
    expect(confHandService.breakerType).toBe('consecutive');
    expect(confHandService.timeoutDuration).toBe(8000);
    expect(confHandService.resetDuration).toBe(5000);
    expect(confHandService.monitorDuration).toBe(10000);
    expect(confHandService.threshold).toBe(0.5);
    expect(confHandService.minimumRequests).toBe(1);
    expect(confHandService.consecutiveFailures).toBe(6);
  });
});
