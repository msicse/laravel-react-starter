// components/PageHeader.tsx
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from '@inertiajs/react';

interface ActionButtonProps {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

interface PageHeaderProps {
  title: string;
  description?: string;
  backLink?: string;
  action?: ActionButtonProps;
}

export function PageHeader({
  title,
  description,
  backLink,
  action
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
      <div className="flex items-center gap-4">
        {backLink && (
          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
            <Link href={backLink}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
        )}
        <div>
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {action && (
        <Button
          variant={action.variant}
          size={action.size}
          onClick={action.onClick}
          asChild={!!action.href}
          className="w-full sm:w-auto"
        >
          {action.href ? (
            <Link href={action.href}>
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Link>
          ) : (
            <>
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
