import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DataAuthService } from '../services/data-auth.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  if (dataAuthService.user) return true;
  const url = router.parseUrl('/login');

  return new RedirectCommand(url);
};
