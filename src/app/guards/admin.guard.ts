import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DataAuthService } from '../services/data-auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  if (dataAuthService.user?.admin) return true;
  const url = router.parseUrl("/availability");

  return new RedirectCommand(url);
};
