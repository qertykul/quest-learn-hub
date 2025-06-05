
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Upload, BarChart3 } from 'lucide-react';

export const PlatformSettings: React.FC = () => {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Настройки платформы
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-auto p-4 flex-col">
            <Upload className="w-6 h-6 mb-2" />
            <span className="font-medium">Импорт данных</span>
            <span className="text-xs opacity-80">Загрузить из файла</span>
          </Button>
          
          <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-auto p-4 flex-col">
            <BarChart3 className="w-6 h-6 mb-2" />
            <span className="font-medium">Отчеты</span>
            <span className="text-xs opacity-80">Детальная аналитика</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
