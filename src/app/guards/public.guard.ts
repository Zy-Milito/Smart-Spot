import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  if (!dataAuthService.user?.token) return true;
  const url = router.parseUrl('/dashboard');

  return new RedirectCommand(url);
};
