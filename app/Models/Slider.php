<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Slider extends Model
{
    use HasFactory;

    /**
     * fillable
     * 
     * @var array
     *
     */
    protected $fillable =[
        'image',
        'link'
    ];

    /**
     * image
     * 
     * @return Attribute
     */
    protected function image():Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('/storage/sliders/' . $image),
        );
    }
}
