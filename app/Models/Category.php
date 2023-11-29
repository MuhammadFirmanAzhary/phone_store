<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
    

class Category extends Model
{
    use HasFactory;

    /**
     * fillable
     * 
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'image'

    ];

    /**
     * product
     * 
     * @return void
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

       /**
     * image
     * 
     * @return Attribute
     */
    protected function image():Attribute
    {
        return Attribute::make(
            get: fn ($image)=> asset('/storage/categories/'. $image),
        );
    }

}
