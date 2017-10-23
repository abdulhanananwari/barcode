<?php

namespace Gelora\Barcode\App\Barcode\Managers\Generators;

use Gelora\Barcode\App\Barcode\BarcodeModel;

require(base_path('Solumax/PhpHelperExtended/Fpdf/fpdf.php'));

class GenerateLabel {

    protected $barcode;
    
    public function __construct(BarcodeModel $barcode) {
        $this->barcode = $barcode;
    }

    public function generate() {

        $this->barcodeFile = tempnam('/tmp', $this->barcode->id);
        include(base_path('Solumax/PhpHelper/Libraries/barcode.php'));
        barcode($this->barcodeFile, str_replace(' ', '', $this->barcode->getAttribute('engine_number')));
        
        
        
        $this->dealerCode = 'EBAE';

        $this->pdf = new \FPDF('P', 'mm', [165, 200]);
        $this->pdf->SetFont('Arial', '', 7);
        $this->pdf->AddPage('P');
        $this->pdf->SetMargins(0,0,0);
        $this->pdf->SetAutoPageBreak(false);
        
        $this->generateColumnLabels();

        $filename = 'SPK-' . $this->barcode->id . '.pdf';
        return $this->pdf->Output('I', $filename);
    }

    protected function generateColumnLabels() {
        
        $leftMargin = 5;

        for ($i = 0; $i < 5; $i++) {
            
            $rowY = (39 * $i) + 2;
            $secondColumnX = $this->pdf->GetPageWidth() / 2 + $leftMargin;
            
            $this->pdf->SetXY($leftMargin, $rowY);
            $this->generateLabel();
            $this->pdf->SetXY($secondColumnX, $rowY);
            $this->generateLabel();
        }
    }

    protected function generateLabel() {
        
        $rowHeight = 3.5;

        $this->pdf->Image($this->barcodeFile, null, null, 60, 7, 'PNG');
        $this->pdf->Cell(0, $rowHeight, 'NO MESIN: ' . str_replace(' ', '', $this->barcode->getAttribute('engine_number')), 0, 2);
        $this->pdf->Cell(0, $rowHeight, 'NO RANGKA: ' . $this->barcode->getAttribute('chasis_number'), 0, 2);
        $this->pdf->Cell(0, $rowHeight, 'NAMA: ' . $this->barcode->getAttribute('name'), 0, 2);
        $this->pdf->Cell(0, $rowHeight, 'ALAMAT: ' . $this->barcode->getAttribute('address'), 0, 2);
        $this->pdf->Cell(0, $rowHeight, 'Type: ' . $this->barcode->getAttribute('type'), 0, 2);
        $this->pdf->Cell(0, $rowHeight, $this->dealerCode . ' | Penjualan: ' . $this->barcode->sales_date->toDateString(), 0, 2);
    }

}
